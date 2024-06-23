import { PORT } from "./config";
import { createApp } from "./core/app";

const app = createApp();

app.get('/', (_, res) => {
    res.send('<h1>Hello World!</h1>');
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});