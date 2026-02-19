// Create a function called processReturns which processes a queue of people returning library books.
// Each person has a name and a list of books with their return dates.
// The function should calculate the late fee for each person based on how many days late each book is (1 day late = $2 fine).
// Remove people from the queue if their total late fee is $0 (all books were returned on time).
// Make sure to implement FIFO (First-In, First-Out)

const Queue = require("../lib/Queue");

function processReturns(queue) {
  // your code here
  const tempQueue = new Queue();
  const totalLateFees = [];

  while (!queue.isEmpty()) {
    const removed = queue.dequeue();
    if (removed.books !== undefined) {
      let lateDays = 0;

      for (let i = 0; i < removed.books.length; i++) {
        lateDays += removed.books[i].daysLate;
      }
      if (lateDays !== 0) {
        let culcLateFees = lateDays * 2;
        totalLateFees.push(culcLateFees);
        // console.log(totalLateFees);
        tempQueue.enqueue(removed);
      }
    }
  }

  while (!tempQueue.isEmpty()) {
    const removed = tempQueue.dequeue();
    queue.enqueue(removed);
  }

  return totalLateFees;
}

const returns = new Queue();
returns.enqueue({
  name: "Alice",
  books: [
    { title: "Book 1", daysLate: 0 },
    { title: "Book 2", daysLate: 5 },
  ],
});
returns.enqueue({ name: "Bob", books: [{ title: "Book 3", daysLate: 0 }] });
returns.enqueue({
  name: "Charlie",
  books: [
    { title: "Book 4", daysLate: 2 },
    { title: "Book 5", daysLate: 4 },
  ],
});

processReturns(returns);
console.log(returns.printQueue());
// Expected output:
// { name: "Alice", books: [{ title: "Book 1", daysLate: 0 }, { title: "Book 2", daysLate: 5 }] }
// { name: "Charlie", books: [{ title: "Book 4", daysLate: 2 }, { title: "Book 5", daysLate: 4 }] }
