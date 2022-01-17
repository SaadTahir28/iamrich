
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.14.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Ensure that become richest is working",
    async fn(chain: Chain, accounts: Map<string, Account>) {
        
        var deployer = accounts.get("deployer")!;

        let block = chain.mineBlock([
            Tx.contractCall("richirich", "become-richest", [], deployer.address)
        ]);

        let result = block.receipts[0].result;
        assertEquals(result.expectOk(), "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM");
        
    },
});
