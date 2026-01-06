package com.example.demoapp

import jakarta.persistence.*

@Entity
@Table(name = "todos")
data class Todo(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,
    
    var title: String,
    
    var completed: Boolean = false
)
