import {Api, Names, Rpc, RpcPayloadUntyped} from "./common";

export const makeApi = <A, B>(worker : Worker, names : Names<A|B>) : Api<A, B> => {
    const waiting : {[key : string] : (x:any) => void} = {};
    const api : {[name : string] : Rpc<any, any>} = {};
    for (const name in names) {
        api[name] = (value : any, cont : (ret:any) => void) : void => {
            const guid = "";
            worker.postMessage({name, value, guid});
            waiting[name + " " + guid] = cont;
        };
    }
    worker.onmessage = (e : MessageEvent) => {
        const payload : RpcPayloadUntyped = e.data;
        const {name, value, guid} = payload;
        const key = name + " " + guid;
        const cont = waiting[key];
        if (cont) {
            delete waiting[key];
            cont(value);
        }
        else {
            throw new Error("no match for name and guid");
        }
    };
    return api as any;
};
