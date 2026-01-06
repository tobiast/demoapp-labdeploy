package com.example.demoapp

import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/api/todos")
class TodoController(private val todoRepository: TodoRepository) {

    @GetMapping
    fun getAllTodos(): List<Todo> = todoRepository.findAll()

    @PostMapping
    fun createTodo(@RequestBody todo: Todo): Todo = todoRepository.save(todo)

    @PutMapping("/{id}")
    fun updateTodo(@PathVariable id: Long, @RequestBody updatedTodo: Todo): ResponseEntity<Todo> {
        return todoRepository.findById(id).map { existingTodo ->
            val todoToUpdate = existingTodo.copy(
                title = updatedTodo.title,
                completed = updatedTodo.completed
            )
            ResponseEntity.ok(todoRepository.save(todoToUpdate))
        }.orElse(ResponseEntity.notFound().build())
    }

    @DeleteMapping("/{id}")
    fun deleteTodo(@PathVariable id: Long): ResponseEntity<Void> {
        return if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id)
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}
