import { useSQLiteContext } from "expo-sqlite/next";
import * as React from "react";
import {
	ActivityIndicator,
	Button,
	ScrollView,
	Text,
	TextInput,
	View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ToDoItem {
	id: number;
	value: string;
}

export default function TodoApp() {
	const [todos, setTodos] = React.useState<ToDoItem[]>([]);
	const [newTodo, setNewTodo] = React.useState("");
	const [loading, setLoading] = React.useState(true);

	const db = useSQLiteContext();

	// Load data on mount
	React.useEffect(() => {
		db.withTransactionAsync(async () => {
			await fetchTodos();
		});
	}, [db]);

	// Fetch todos from database
	async function fetchTodos() {
		const result = await db.getAllAsync<ToDoItem>(
			`SELECT * FROM todoData ORDER BY id DESC;`
		);
		setTodos(result);
		setLoading(false);
	}

	// Add new todo to the database
	async function addTodo() {
		if (!newTodo.trim()) return;
		const newTodoItem = { value: newTodo };

		db.withTransactionAsync(async () => {
			await db.runAsync(`INSERT INTO todoData (value) VALUES (?);`, [newTodo]);
			await fetchTodos(); // Refresh the todo list
		});
		setNewTodo("");
	}

	// Delete a todo from the database
	async function deleteTodoItem(id: number) {
		db.withTransactionAsync(async () => {
			await db.runAsync(`DELETE FROM todoData WHERE id = ?;`, [id]);
			await fetchTodos(); // Refresh the todo list
		});
	}

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size='large' />
				<Text>Loading todos...</Text>
			</View>
		);
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<ScrollView contentContainerStyle={{ padding: 20 }}>
				{todos.length > 0 ? (
					todos.map((todo) => (
						<View
							key={todo.id}
							style={{
								flexDirection: "row",
								justifyContent: "space-between",
								marginVertical: 10,
							}}
						>
							<Text>{todo.value}</Text>
							<Button title='Delete' onPress={() => deleteTodoItem(todo.id)} />
						</View>
					))
				) : (
					<Text>No ToDo items found.</Text>
				)}
				<TextInput
					value={newTodo}
					onChangeText={setNewTodo}
					placeholder='Add new todo'
					style={{ padding: 10, backgroundColor: "#fff", marginBottom: 10 }}
				/>
				<Button title='Add Todo' onPress={addTodo} />
			</ScrollView>
		</SafeAreaView>
	);
}
