import Text "mo:base/Text";
import Time "mo:base/Time";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Bool "mo:base/Bool";
import UtilityProvider "canister:utility_provider";
import Fuzz "mo:fuzz";
import TextX "mo:xtended-text/TextX";
import Backend "canister:backend";
import Vector "mo:vector/Class";

actor Charity {
  type Transaction = {
    from : Text;
    to : Text;
    amount : Nat;
    time : Time.Time;
    notes : Text;
    id : Text;
    types : Text;
    request_status : Text;
    currency : Text;
  };
  type CharityEvent = {
    id : Text;
    title : Text;
    current_donation : Nat;
    target_donation : Nat;
    charity_owner_id : Text;
    image_urls : Text;
    description : Text;
    start_date : Time.Time;
    end_date : Time.Time;
    tags : [Text];
    location : Text;
    transactions : [Transaction];
    target_currency : Text;
  };

  type CharityEventRequest = {
    title : Text;
    target_donation : Nat;
    image_urls : Text;
    description : Text;
    end_date : Time.Time;
    tags : [Text];
    location : Text;
    target_currency : Text;
  };
  type TransactionRequest = {
    charity_id : Text;
    amount : Nat;
    notes : Text;
    types : Text;
    charity_wallet_id : Text;
  };

  let charities = TrieMap.TrieMap<Text, CharityEvent>(Text.equal, Text.hash);
  let tag_lists = ["animals", "medical", "education", "sport", "environment", "family", "funeral", "business", "emergency", "other"];

  public shared ({ caller }) func addCharity(new_charity : CharityEventRequest) : async Result.Result<(), Text> {
    if (Principal.isAnonymous(caller)) {
      return #err("Unauthorized");
    };
    let owner = await Backend.getUser(caller);
    switch (owner) {
      case null {
        return #err("User not found!");
      };
      case (?u) {
        let charity_id = await UtilityProvider.getUUID();
        let charity = {
          id = charity_id;
          title = new_charity.title;
          current_donation = 0;
          target_donation = new_charity.target_donation;
          image_urls = new_charity.image_urls;
          charity_owner_id = Principal.toText(caller);
          description = new_charity.description;
          tags = new_charity.tags;
          start_date = Time.now();
          end_date = new_charity.end_date;
          location = new_charity.location;
          target_currency = new_charity.target_currency;
          transactions = [];
        };

        charities.put(charity.id, charity);
        let _ = await Backend.addOwnedCharityReference(caller, charity.id); // tambahin ke reference user biar cepet
        return #ok();
      };
    };

    return #ok();
  };

  public shared (msg) func addTransaction(request : TransactionRequest) : async Result.Result<(), Text> {
    let transaction_id = await UtilityProvider.getUUID();
    let charity = await getCharity(request.charity_id);

    switch (charity) {
      case (#err(msg)) {
        return #err("Charity doesn't exists");
      };
      case (#ok(founded_charity)) {
        let transaction : Transaction = {
          from = if (request.types == "donation") Principal.toText(msg.caller) else request.charity_id;
          to = if (request.types == "donation") request.charity_id else request.charity_wallet_id;
          amount = request.amount;
          time = Time.now();
          notes = request.notes;
          id = transaction_id;
          types = request.types;
          currency = founded_charity.target_currency;
          request_status = "";
        };

        if (transaction.types == "withdraw") {
          if (founded_charity.charity_owner_id != Principal.toText(msg.caller)) return #err("Unauthorized");
          if (founded_charity.current_donation < transaction.amount) return #err("Insufficient Fund");

          let added_transactions = Array.append<Transaction>(founded_charity.transactions, [transaction]);

          let updated_charity = {
            id = founded_charity.id;
            title = founded_charity.title;
            target_donation = founded_charity.target_donation;
            image_urls = founded_charity.image_urls;
            charity_owner_id = founded_charity.charity_owner_id;
            description = founded_charity.description;
            tags = founded_charity.tags;
            start_date = founded_charity.start_date;
            current_donation = founded_charity.current_donation;
            end_date = founded_charity.end_date;
            location = founded_charity.location;
            transactions = added_transactions;
            target_currency = founded_charity.target_currency;
          };

          charities.put(updated_charity.id, updated_charity);

          return #ok();
        };

        let added_transactions = Array.append<Transaction>(founded_charity.transactions, [transaction]);

        let updated_charity = {
          id = founded_charity.id;
          title = founded_charity.title;
          target_donation = founded_charity.target_donation;
          image_urls = founded_charity.image_urls;
          charity_owner_id = founded_charity.charity_owner_id;
          description = founded_charity.description;
          tags = founded_charity.tags;
          start_date = founded_charity.start_date;
          current_donation = founded_charity.current_donation + request.amount;
          end_date = founded_charity.end_date;
          location = founded_charity.location;
          transactions = added_transactions;
          target_currency = founded_charity.target_currency;
        };
        charities.put(updated_charity.id, updated_charity);
        if (request.types == "donation") {
          let save_user_transaction_response = await Backend.addDonationReference(msg.caller, updated_charity.id, transaction.id);
          return save_user_transaction_response;
        } else {
          return #ok();
        };
      };
    };
  };

  func isInLocation(wanted_locations : [Text], current_location : Text) : Bool {
    return (
      Array.find<Text>(
        wanted_locations,
        func(location : Text) : Bool {
          return TextX.toLower(location) == TextX.toLower(current_location);
        },
      ) != null
    );
  };

  func isInCharitytag(wanted_tags : [Text], current_charity_tags : [Text]) : Bool {
    return (
      Array.find<Text>(
        current_charity_tags,
        func(tag : Text) : Bool {
          for (g in wanted_tags.vals()) {
            if (TextX.toLower(tag) == TextX.toLower(g)) {
              return true;
            };
          };
          return false;
        },
      ) != null
    );
  };

  public shared query func getAllCharities(search_params : ?Text, charity_tags : ?[Text], locations : ?[Text]) : async Result.Result<[CharityEvent], Text> {
    let all_charities = Iter.toArray(charities.vals());
    switch (search_params) {
      case null {
        switch (charity_tags) {
          case null {
            switch (locations) {
              case null {
                return #ok(all_charities);
              };
              case (?wanted_locations) {
                let filtered_charities = Array.filter<CharityEvent>(
                  all_charities,
                  func(charity : CharityEvent) : Bool {
                    let current_location : Text = charity.location;
                    return isInLocation(wanted_locations, current_location);
                  },
                );
                return #ok(filtered_charities);
              };
            };
          };
          case (?wanted_tags) {
            let filtered_charities = Array.filter<CharityEvent>(
              all_charities,
              func(charity : CharityEvent) : Bool {
                let current_charity_tags : [Text] = charity.tags;
                return isInCharitytag(wanted_tags, current_charity_tags);
              },
            );
            switch (locations) {
              case null {
                return #ok(filtered_charities);
              };
              case (?wanted_locations) {
                let filtered_charities_location = Array.filter<CharityEvent>(
                  filtered_charities,
                  func(charity : CharityEvent) : Bool {
                    let current_location : Text = charity.location;
                    return isInLocation(wanted_locations, current_location);
                  },
                );
                return #ok(filtered_charities_location);
              };
            };
          };
        };
      };
      case (?params) {
        let filtered_charities = Array.filter<CharityEvent>(
          all_charities,
          func(charity : CharityEvent) : Bool {
            let temp_params = TextX.toLower(params);
            let title_validation = Text.contains(TextX.toLower(charity.title), #text temp_params);
            switch (charity_tags) {
              case null {
                return title_validation;
              };
              case (?wanted_tags) {
                switch (locations) {
                  case null {
                    return Bool.logand(isInCharitytag(wanted_tags, charity.tags), title_validation);
                  };
                  case (?wanted_locations) {
                    let current_location : Text = charity.location;
                    let curr_validation = Bool.logand(isInCharitytag(wanted_tags, charity.tags), title_validation);
                    return Bool.logand(curr_validation, isInLocation(wanted_locations, current_location));
                  };
                };
              };
            };
          },
        );

        switch (filtered_charities.size()) {
          case 0 {
            return #err("Charity Not Found");
          };
          case (num) {
            return #ok(filtered_charities);
          };
        };
      };
    };
    return #ok(all_charities);
  };

  public shared query (msg) func getCharity(charity_id : Text) : async Result.Result<CharityEvent, Text> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err("Unauthorized");
    };
    let charity = charities.get(charity_id);

    switch (charity) {
      case null {
        return #err("Charity not found");
      };
      case (?founded_charity) {
        return #ok(founded_charity);
      };
    };
  };

  public shared (msg) func updateCharity(charity_id : Text, charity : CharityEvent) : async Result.Result<(), Text> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err("Unauthorized");
    };
    let target_charity = charities.get(charity_id);

    switch (target_charity) {
      case null {
        return #err("Charity not found");
      };
      case (?c) {
        if (c.charity_owner_id != Principal.toText(msg.caller)) {
          return #err("Unauthorized");
        };
        charities.put(charity_id, charity);

        return #ok();
      };
    };
  };

  public shared (msg) func deleteCharity(charity_id : Text) : async Result.Result<?CharityEvent, Text> {
    if (Principal.isAnonymous(msg.caller)) {
      return #err("Unauthorized");
    };
    return #ok(charities.remove(charity_id));
  };

  public shared query func getAllCharityLocations() : async Result.Result<[Text], ()> {
    let locations = Vector.Vector<Text>();

    for ((_, charity) in charities.entries()) {
      if (not Vector.contains<Text>(locations, charity.location, Text.equal)) {
        locations.add(charity.location);
      };
    };

    return #ok(Vector.toArray(locations));
  };

  // public shared query func getTopDonatedCharity(item_count : Nat) : async Result.Result<[CharityEvent], Text> {
  //   let all_charities = Iter.toArray(charities.vals());
  //   let sorted_charities = Array.sort<CharityEvent>(
  //     all_charities,
  //     func(a : CharityEvent, b : CharityEvent) : Bool {
  //       return a.current_donation > b.current_donation;
  //     },
  //   );
  //   return #ok(sorted_charities);
  // };

  public shared func seedCharity() : async Result.Result<Text, ()> {
    var total_dummy_data = 10;
    var current_idx = 0;
    let fuzz = Fuzz.Fuzz();

    while (current_idx < total_dummy_data) {
      let charity_id = await UtilityProvider.getUUID();
      let charity = {
        id = charity_id;
        title = fuzz.text.randomText(fuzz.nat.randomRange(10, 30));
        target_donation = fuzz.nat.randomRange(1000, 10000);
        image_urls = "https://firebasestorage.googleapis.com/v0/b/dg-travelohi.appspot.com/o/434228032_387590770791800_8682384244587217201_n.jpeg?alt=media&token=ec92f6c2-8871-4965-b1d3-346bd34fbf33";
        charity_owner_id = "5zbvf-7tsxx-b25u4-kkjec-przul-f623a-tqjc6-ac6er-2pnpd-yoxfi-zae";
        description = fuzz.text.randomText(fuzz.nat.randomRange(100, 300));
        start_date = Time.now();
        end_date = 1746770723;
        current_donation = 0;
        tags = [tag_lists[fuzz.nat.randomRange(0, tag_lists.size() - 1)]];
        transactions = [];
        location = "Jakarta, Indonesia";
        target_currency = "ICP";
      };
      charities.put(charity_id, charity);
      current_idx += 1;
    };
    return #ok("Charity seeded");
  };

  public shared (msg) func getUserDonations() : async Result.Result<[Transaction], Text> {
    let user = await Backend.getUser(msg.caller);
    let user_donations = Vector.Vector<Transaction>();
    switch (user) {
      case null {
        return #err("User not found!");
      };
      case (?u) {
        for (reference in u.donation_reference.vals()) {
          let charity = await getCharity(reference.charity_id);
          switch (charity) {
            case (#err(msg)) {
              return #err("Charity Not Found");
            };
            case (#ok(founded_charity)) {
              for (c in founded_charity.transactions.vals()) {
                if (c.id == reference.donation_id) {
                  user_donations.add(c);
                };
              };
            };
          };
        };
        return #ok(Vector.toArray(user_donations));
      };
    };
  };

  public shared ({ caller }) func getOwnedCharities() : async Result.Result<[CharityEvent], Text> {
    let user = await Backend.getUser(caller);
    let valid_charities = Vector.Vector<CharityEvent>();
    switch (user) {
      case (null) {
        return #err("User not found");
      };
      case (?u) {

        for (id in u.owned_charity_reference.vals()) {
          switch (charities.get(id)) {
            case null {

            };
            case (?charity) {
              // if(charity.charity_owner_id == u.identity){
              // }
              valid_charities.add(charity);
            };
          };
        };
        return #ok(Vector.toArray(valid_charities));
      };
    };
  };
  public shared composite query func getAllWithdrawal(adminEmail:Text) : async Result.Result<[Transaction], Text> {
    let admin = await Backend.getUserByEmail(adminEmail);
    switch (admin) {
      case (#err(msg)) {
        return #err("User not found");
      };
      case (#ok(u)) {
        if (u.role != "admin") {
          return #err("Unauthorized");
        };
        let withdrawal_transaction = Vector.Vector<Transaction>();
        for ((_, charity) in charities.entries()) {
          for (transaction in charity.transactions.vals()) {
            if (transaction.types == "withdraw") {
              withdrawal_transaction.add(transaction);
            };
          };
        };
        switch (withdrawal_transaction.size()) {
          case 0 {
            return #err("No Withdrawal Transaction Yet");
          };
          case (num) {
            return #ok(Vector.toArray(withdrawal_transaction));
          };
        };
      };
    };
  };
  public shared composite query ({ caller }) func getWithdrawal(adminEmail:Text, transaction_id : Text) : async Result.Result<Transaction, Text> {
    //deprecated
    if (Principal.isAnonymous(caller)) {
      return #err("Unauthorized");
    };
    let all_withdrawal = await getAllWithdrawal(adminEmail);
    switch (all_withdrawal) {
      case (#err(msg)) {
        return #err(msg);
      };
      case (#ok(withdrawals)) {
        for (w in withdrawals.vals()) {
          if (w.id == transaction_id) {
            return #ok(w);
          };
        };
        return #err("Withdrawal not found");
      };
    };

  };

  public shared func updateWithdrawalStatus(adminEmail: Text, charity_id : Text, transaction_id : Text) : async Result.Result<(), Text> {
    let user = await Backend.getUserByEmail(adminEmail);
    switch (user) {
      case (#err(msg)) {
        return #err("User not found");
      };
      case (#ok(u)) {
        if (u.role != "admin") {
          return #err("Unauthorized");
        };
        let charity = await getCharity(charity_id);
        switch (charity) {
          case (#err(msg)) {
            return #err(msg);
          };
          case (#ok(c)) {
            let temp_transaction = TrieMap.TrieMap<Text, Transaction>(Text.equal, Text.hash);
            var amount = 0;
            for (transaction in c.transactions.vals()) {
              if (transaction.id == transaction_id) {
                let updated_transaction : Transaction = {
                  from = transaction.from;
                  to = transaction.to;
                  amount = transaction.amount;
                  time = transaction.time;
                  notes = transaction.notes;
                  id = transaction.id;
                  types = transaction.types;
                  currency = transaction.currency;
                  request_status = "completed";
                };
                temp_transaction.put(transaction.id, updated_transaction);
                amount += transaction.amount;
              } else {
                temp_transaction.put(transaction.id, transaction);
              };
            };
            let updated_charity = {
              id = c.id;
              title = c.title;
              target_donation = c.target_donation;
              image_urls = c.image_urls;
              charity_owner_id = c.charity_owner_id;
              description = c.description;
              tags = c.tags;
              start_date = c.start_date;
              current_donation = amount + c.current_donation;
              end_date = c.end_date;
              location = c.location;
              transactions = Iter.toArray(temp_transaction.vals());
              target_currency = c.target_currency;
            };
            charities.put(updated_charity.id, updated_charity);
            return #ok();
          };
        };
      };
    };
  };
};
