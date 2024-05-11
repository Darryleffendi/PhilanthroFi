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
    notes: Text;
    id: Text;
    types: Text;
  };
  type CharityEvent = {
    id: Text;
    title: Text;
    current_donation: Nat;
    target_donation: Nat;
    charity_owner_id: Text;
    image_urls: Text;
    description: Text;
    start_date: Time.Time;
    end_date: Time.Time;
    tags: [Text];
    location: Text;
    transactions: [Transaction];
    target_currency: Text;
  };

  type CharityEventRequest = {
    title: Text;
    target_donation: Nat;
    image_urls: Text;
    description: Text;
    end_date: Time.Time;
    tags: [Text];
    location: Text;
    target_currency: Text;
  };
  type TransactionRequest = {
    charity_id: Text;
    amount: Nat;
    time: Time.Time;
    notes: Text;
    transaction_hash: Text;
    types: Text;
  };
  let charities = TrieMap.TrieMap<Text, CharityEvent>(Text.equal, Text.hash);
  let tag_lists = ["animals", "medical", "education", "sport", "environment", "family", "funeral", "business", "emergency", "other"];

  public shared (msg) func addCharity(new_charity: CharityEventRequest) : async Result.Result<(), Text> {
    let charity_id = await UtilityProvider.getUUID();
    
    let charity = {
      id = charity_id;
      title = new_charity.title;
      current_donation = 0;
      target_donation = new_charity.target_donation;
      image_urls = new_charity.image_urls;
      charity_owner_id = Principal.toText(msg.caller);
      description = new_charity.description;
      tags = new_charity.tags;
      start_date = Time.now();
      end_date = new_charity.end_date;
      location = new_charity.location;
      target_currency = new_charity.target_currency;
      transactions = [];
    };

    charities.put(charity.id, charity); 
    
    return #ok();
  };

  
  public shared (msg) func addTransaction(request : TransactionRequest) : async Result.Result<(), Text> {

    let transaction : Transaction = {
      from = Principal.toText(msg.caller);
      to = request.charity_id;
      amount = request.amount;
      time = request.time;
      notes = request.notes;
      id = request.transaction_hash;
      types = request.types;
    };
    
    let charity = await getCharity(request.charity_id);

    switch(charity){
      case (#err(msg)) {
        return #err("Charity doesn't exists");
      };
      case(#ok(founded_charity)){

        if(Bool.logand(transaction.types == "donation",founded_charity.charity_owner_id != Principal.toText(msg.caller))){
          return #err("Unuthorized");
        };
        let added_transactions  = Array.append<Transaction>(founded_charity.transactions, [transaction]);
        
        let updated_charity = {
          id = founded_charity.id;
          title = founded_charity.title;
          target_donation = founded_charity.target_donation;
          image_urls = founded_charity.image_urls;
          charity_owner_id = founded_charity.charity_owner_id;
          description = founded_charity.description;
          tags = founded_charity.tags;
          start_date = founded_charity.start_date;
          current_donation = request.amount + founded_charity.current_donation; 
          end_date = founded_charity.end_date;
          location = founded_charity.location;
          transactions = added_transactions;
          target_currency = founded_charity.target_currency;
        };
        charities.put(updated_charity.id, updated_charity);
        if(request.types == "donation"){
          let save_user_transaction_response = await Backend.addDonationReference(msg.caller, updated_charity.id, transaction.id);
          return save_user_transaction_response;
        } else{
          return #ok();
        }
      };
    };
  };

  func isInCharitytag(wanted_tags : [Text], current_charity_tags : [Text]) : Bool {
    return (Array.find<Text>(current_charity_tags, func(tag : Text) : Bool {
                for(g in wanted_tags.vals()){
                  if(tag == g){
                    return true;
                  };
                };
                return false;
              }) != null);
  };

  public shared query func getAllCharities(search_params: ?Text, charity_tags: ?[Text]) : async Result.Result<[CharityEvent], Text> {
    let all_charities = Iter.toArray(charities.vals()); 
    switch(search_params){
      case null{
        switch(charity_tags){
          case null{
            return #ok(all_charities);
          };
          case(?wanted_tags){
            let filtered_charities = Array.filter<CharityEvent>(all_charities, func (charity: CharityEvent): Bool {
              let current_charity_tags : [Text] = charity.tags;
              return isInCharitytag(wanted_tags, current_charity_tags);
            });
            return #ok(filtered_charities);
          };
        }
      };
      case(?params){ 
        let filtered_charities = Array.filter<CharityEvent>(all_charities, func (charity: CharityEvent): Bool {
          let temp_params = TextX.toLower(params);
          let title_validation = Text.contains(TextX.toLower(charity.title), #text temp_params);
          switch(charity_tags){
            case null{
              return title_validation;
            };
            case(?wanted_tags){
              return Bool.logand(isInCharitytag(wanted_tags, charity.tags), title_validation);
            };
          }
        });

        switch(filtered_charities.size()){
          case 0{
            return #err("Charity Not Found");
          };
          case (num){
            return #ok(filtered_charities);
          };
        }
      }
    };
    return #ok(all_charities);
  };

  public shared query (msg) func getCharity(charity_id : Text) : async Result.Result<CharityEvent, Text> {
    if(Principal.isAnonymous(msg.caller)){
      return #err("Unauthorized");
    };
    let charity = charities.get(charity_id);
    
    switch(charity){
      case null{
        return #err("Charity not found");
      };
      case(?founded_charity){
        return #ok(founded_charity)
      }
    }
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
        if(c.charity_owner_id != Principal.toText(msg.caller)){
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

  public shared func seedCharity() : async Result.Result<Text, ()> {
    var total_dummy_data = 10;
    var current_idx = 0;
    let fuzz = Fuzz.Fuzz();

    while(current_idx < total_dummy_data) {
      let charity_id = await UtilityProvider.getUUID();
      let charity = {
        id = charity_id;
        title = fuzz.text.randomText(fuzz.nat.randomRange(10, 30));
        target_donation = fuzz.nat.randomRange(1000, 10000);
        image_urls = "data:image/webp;base64,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";
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

  public shared (msg) func getUserDonations () : async Result.Result<[Transaction], Text> {
    let user = await Backend.getUser(msg.caller);
    let user_donations = Vector.Vector<Transaction>();
    switch(user){
      case null{
        return #err("User not found!");
      };
      case (?u){
        for(reference in u.donation_reference.vals()){
          let charity = await getCharity(reference.charity_id);
          switch(charity){
            case (#err(msg)){
              return #err("Charity Not Found");
            };
            case (#ok(founded_charity)){
              for(c in founded_charity.transactions.vals()){
                if(c.id == reference.donation_id){
                  user_donations.add(c);
                }
              };
            }
          };
        };
        return #ok(Vector.toArray(user_donations));
      };
    };
    
  }
}