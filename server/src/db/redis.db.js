import { createClient } from "redis";

const client = createClient({
    url: 'redis://:PotlaEktaBaal(123)@127.0.0.1:6379'
})

export { client };
