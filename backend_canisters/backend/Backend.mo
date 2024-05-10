import Principal "mo:base/Principal";
import Time "mo:base/Time";
import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Array "mo:base/Array";

actor class Backend() {
  type DonationReference = {
    charity_id: Text;
    donation_id: Text;
  };
  
  type User = {
    identity: Principal;
    first_name: Text;
    last_name: Text;
    email: Text;
    birth_date: Text;
    timestamp: Time.Time;
    donation_reference: [DonationReference];
  };
  let users = TrieMap.TrieMap<Principal, User>(Principal.equal, Principal.hash);

  public shared ({caller}) func register(first_name: Text, last_name:Text, email:Text, birth_date:Text):async Result.Result<User, Text>{
    let identity = caller;
    
    if(users.get(identity) != null){
      return #err("User Already Exists!");
    };

    for (user in users.vals()){
      if(user.email == email){
        return #err("Email Already Exists!");
      };
    };

    let new_user = {
      identity = identity;
      first_name = first_name;
      last_name = last_name;
      email = email;
      birth_date = birth_date;
      timestamp = Time.now();
      donation_reference = [];
    };

    users.put(new_user.identity, new_user);

    return #ok(new_user)
  };
  public query func getAllUser() : async Result.Result<[User], Text> {
    let allUser = Iter.toArray(users.vals()); 
    return #ok(allUser);
  };
  public query func getUser(principal: Principal) : async ?User{
    let user = users.get(principal);
    if (user == null){
      return null;
    };
    return user;
  };

  public shared ({caller}) func whoami() :async Text{
    return Principal.toText(caller)
  };

  public shared func addDonationReference(principal : Principal, charity_id : Text, donation_id : Text) : async Result.Result<(), Text> {
    let user = await getUser(principal);
    switch(user){
      case null {
        return #err("No User Found");
      };
      case (?founded_user){
        let donation_reference = {
          charity_id = charity_id;
          donation_id = donation_id;
        };

        let updated_donation_reference = Array.append<DonationReference>(founded_user.donation_reference, [donation_reference]);
        
        let updated_user = {
          identity = founded_user.identity;
          first_name = founded_user.first_name;
          last_name = founded_user.last_name;
          email = founded_user.email;
          birth_date = founded_user.birth_date;
          timestamp = founded_user.timestamp;
          donation_reference = updated_donation_reference;
        };
        users.put(principal, updated_user);
        return #ok();
      }
    };
  };
}
