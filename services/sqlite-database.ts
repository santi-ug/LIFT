import * as SQLite from "expo-sqlite";

import { ToDoItem } from "../types/todoitem";

const tableName = "todoData";

// Opening the database
export const getDBConnection = async () => {
	const db = SQLite.openDatabaseSync("liftsqlite.db");
	console.log("Database connection opened", db);
	return db;
};

// Creating the table
export const createTable = async (db: any) => {
	try {
		await db.withTransactionAsync(async () => {
			await db.execAsync(
				`CREATE TABLE IF NOT EXISTS todoData (
					id INTEGER PRIMARY KEY AUTOINCREMENT, 
					value TEXT NOT NULL
				);`
			);
			console.log("Table created or exists");
		});
	} catch (error) {
		console.error("Error creating table: ", error);
	}
};

export const getTodoItems = async (db: any): Promise<ToDoItem[]> => {
	try {
		const todoItems: ToDoItem[] = [];

		await db.withTransactionAsync(async () => {
			const result = await db.execAsync(`SELECT id, value FROM ${tableName};`);

			if (result?.[0]?.rows) {
				const { rows } = result[0]; // Access the first result set
				for (let i = 0; i < rows.length; i++) {
					todoItems.push(rows.item(i));
				}
			}
		});

		return todoItems;
	} catch (error) {
		console.error("Error fetching todo items:", error);
		throw new Error(String(error));
	}
};

export const saveTodoItems = async (db: any, todoItem: ToDoItem) => {
	try {
		await db.withTransactionAsync(async () => {
			// Insert the item
			const insertQuery = `INSERT INTO todoData (value) VALUES ('${todoItem.value}');`;
			console.log("Insert query: ", insertQuery);
			await db.execAsync(insertQuery);
			const names = await db.execAsync(
				`SELECT name FROM sqlite_master WHERE type = 'table';`
			); // Commit the transaction

			// Log the table names
			if (names?.[0]?.rows?.length > 0) {
				const { rows } = names[0];
				for (let i = 0; i < rows.length; i++) {
					console.log("Table name: ", rows.item(i).name);
				}
			} else {
				console.log("No table names found in the database.");
			}

			// Fetch immediately after insert
			const result = await db.execAsync(`SELECT * FROM todoData;`);
			if (result?.[0]?.rows?.length > 0) {
				const { rows } = result[0];
				for (let i = 0; i < rows.length; i++) {
					console.log("Row: ", rows.item(i)); // Log each row
				}
			} else {
				console.log("No rows found in the database.");
			}
		});
	} catch (error) {
		console.error("Error saving todo item:", error);
		throw new Error(String(error));
	}
};

export const deleteTodoItem = async (db: any, id: number) => {
	try {
		await db.withTransactionAsync(async (tx: any) => {
			await tx.execAsync(`DELETE FROM ${tableName} WHERE id = ?;`, [id]); // Changed 'rowid' to 'id'
		});
		console.log(`Todo item with id ${id} deleted`);
	} catch (error) {
		console.error("Error deleting todo item:", error);
		throw new Error(String(error));
	}
};
