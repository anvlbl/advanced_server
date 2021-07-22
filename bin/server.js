import index from '../index.js';

const port = 3002;

index().listen(port, () => {
    console.log(`server started on port ${port}`);
})