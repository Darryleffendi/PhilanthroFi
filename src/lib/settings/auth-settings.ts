import { canisterId as iiCanisterIdentity } from "src/declarations/internet_identity";
const days = BigInt(1);
const hours = BigInt(24);
const nanoseconds = BigInt(3600000000000);

export const defaultOptions = {
    createOptions: {
        idleOptions: {
        disableIdle: true,
        },
    },
    loginOptions: {
        identityProvider:
        process.env.DFX_NETWORK === 'ic'
            ? 'https://identity.ic0.app/#authorize'
            : `http://${iiCanisterIdentity}.localhost:4943/`,
        maxTimeToLive: days * hours * nanoseconds,
    },
};

