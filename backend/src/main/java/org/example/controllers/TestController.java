package org.example.controllers;

import org.example.model.Transaction;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }


    @GetMapping("/hello2")
    public String test() {
        return "A to jest";
    }

    @PostMapping("/transactions")
    public Transaction handleTransaction(@RequestBody Transaction transaction) {
        System.out.println(transaction);
        return transaction;
    }
}
