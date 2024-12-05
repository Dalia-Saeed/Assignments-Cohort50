/*------------------------------------------------------------------------------
Full description at: https://github.com/HackYourFuture/Assignments/tree/main/3-UsingAPIs/Week1#exercise-3-roll-a-die

- Run the unmodified program and confirm that problem described occurs.
- Refactor the `rollDie()` function from callback-based to returning a
  promise.
- Change the calls to `callback()` to calls to `resolve()` and `reject()`.
- Refactor the code that call `rollDie()` to use the promise it returns.
- Does the problem described above still occur? If not, what would be your
  explanation? Add your answer as a comment to be bottom of the file.
------------------------------------------------------------------------------*/

export function rollDie() {
  return new Promise((resolve, reject) => {
    const randomRollsToDo = Math.floor(Math.random() * 8) + 3;
    console.log(`Die scheduled for ${randomRollsToDo} rolls...`);

    const rollOnce = (roll) => {
      const value = Math.floor(Math.random() * 6) + 1;
      console.log(`Die value is now: ${value}`);

      if (roll > 6) {
        reject(new Error('Oops... Die rolled off the table.'));
      }

      if (roll === randomRollsToDo) {
        resolve(value);
      }

      if (roll < randomRollsToDo) {
        setTimeout(() => rollOnce(roll + 1), 500);
      }
    };

    rollOnce(1);
  });
}

function main() {
  rollDie()
    .then((value) => {
      console.log(`Success! Die settled on ${value}.`);
    })
    .catch((error) => {
      console.log(error.message);
    });
}

// ! Do not change or remove the code below
if (process.env.NODE_ENV !== 'test') {
  main();
}

/*------------------------------------------------------------------------------
### Does the problem described above still occur?

No, the issue described earlier does not occur anymore. Here's why:
- Promises ensure that either `resolve` or `reject` is called once, and further
  code execution in the promise chain stops after that.
- In the original code, even after an error callback was invoked, subsequent
  rolls continued to trigger, resulting in a success callback being called too.
  With Promises, `reject` immediately halts further execution of `.then` handlers.
------------------------------------------------------------------------------*/
