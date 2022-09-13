const {exec} = require('child_process');

const execShellCommand = command => {
    return new Promise((resolve, reject) => {
        exec(command, (err, stdout, stderr) => {
            if (err) {
                console.log(err)
                reject(err)
            } else {
                console.log(stdout || stderr)
                resolve()
            }
        })
    })
}

beforeAll(async () => {
    await execShellCommand('dotenv -e .env.test -- npx prisma migrate dev --name init')
})

afterAll(async () => {
    await execShellCommand('dotenv -e .env.test -- npx prisma migrate reset -f')
})