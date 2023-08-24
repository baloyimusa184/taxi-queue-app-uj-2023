import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

export const dbPromise = sqlite.open({
    filename: './taxi_queue.db',
    driver: sqlite3.Database,
});

// Function to add a passenger to the queue
export async function joinQueue() {
    const db = await dbPromise;
    await db.run('UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count + 1');
}

// Function to remove a passenger from the queue
export async function leaveQueue() {
    const db = await dbPromise;
    await db.run('UPDATE taxi_queue SET passenger_queue_count = passenger_queue_count - 1 WHERE passenger_queue_count > 0');
}

// Function to add a taxi to the taxi queue
export async function joinTaxiQueue() {
    const db = await dbPromise;
    await db.run('UPDATE taxi_queue SET taxi_queue_count = taxi_queue_count + 1');
}

// Function to get the length of the passenger queue
export async function queueLength() {
    const db = await dbPromise;
    const result = await db.get('SELECT passenger_queue_count FROM taxi_queue');
    return result.passenger_queue_count;
}

// Function to get the length of the taxi queue
export async function taxiQueueLength() {
    const db = await dbPromise;
    const result = await db.get('SELECT taxi_queue_count FROM taxi_queue');
    return result.taxi_queue_count;
}

// Function to handle a taxi departure from the queue
export async function taxiDepart() {
    const db = await dbPromise;
    const taxiCount = await taxiQueueLength();

    if (taxiCount >= 12) {
        await db.run('UPDATE taxi_queue SET taxi_queue_count = taxi_queue_count-12');
    } else {
        // Handle the case where there are not enough taxis for departure
    }
}
