import UUID "mo:uuid/UUID";
import Source "mo:uuid/async/SourceV4";
import Text "mo:base/Text";

actor UtilityProvider{
  public shared func getUUID() : async Text{
    return UUID.toText(await Source.Source().new())
  }
}