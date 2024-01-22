import readline from 'readline';
import { Tokenizer } from '../lexer/lexer';

export function Start() {
    const rs = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });


    rs.on('line', (input) => {
        const tokenizer = new Tokenizer(input);

        while (true) {
            const token = tokenizer.NextToken();
            if (token.Type === 'EOF') {
                break;
            }
            console.log(token);
        }
    });

    rs.on('close', () => {
        console.log('Bye!');
        process.exit(0);
    });
}
