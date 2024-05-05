import Text "mo:base/Text";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import TrieMap "mo:base/TrieMap";
import Result "mo:base/Result";
import Debug "mo:base/Debug";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import UtilityProvider "canister:utility_provider";
actor Charity {

  type Money = {
    amount : Nat;
    currency : Text;
  };

  type Charity = {
    id: Text;
    title: Text;
    target_donation: Money;
    charity_owner_id: Text;
    image_urls: Text;
    description: Text;
    timestamp: Time.Time;
    total_donation: Int;
  };

  type CharityRequest = {
    title: Text;
    target_donation: Money;
    image_urls: Text;
    description: Text;
    timestamp: Time.Time;
  };

  let charities = TrieMap.TrieMap<Text, Charity>(Text.equal, Text.hash);
  
  public shared (msg) func addCharity(newCharity: CharityRequest) : async Result.Result<(), Text> {
    let charityId = await UtilityProvider.getUUID();
    let charity = {
      id = charityId;
      title = newCharity.title;
      target_donation = newCharity.target_donation;
      image_urls = newCharity.image_urls;
      charity_owner_id = Principal.toText(msg.caller);
      description = newCharity.description;
      timestamp = Time.now();
      total_donation = 0;
    };

    charities.put(charity.id, charity); 
    
    return #ok();
  };

  public shared query func getAllCharities() : async Result.Result<[Charity], Text> {
    return #ok(Iter.toArray(charities.vals()));
  };
  public shared query (msg) func getCharity(charity_id : Text) : async Result.Result<Charity, Text> {
    if(Principal.isAnonymous(msg.caller)){
      return #err("You are unauthorized");
    };
    let charity = charities.get(charity_id);
    
    switch(charity){
      case null{
        return #err("Charity not found");
      };
      case(?foundedCharity){
        return #ok(foundedCharity)
      }
    }
  };
}