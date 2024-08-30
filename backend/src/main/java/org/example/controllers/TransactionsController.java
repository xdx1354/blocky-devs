package org.example.controllers;

import org.example.DTO.TransactionDTO;
import org.example.model.Transaction;
import org.example.model.TransactionPage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.example.services.TransactionService;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/v1")
public class TransactionsController {

    private final TransactionService transactionService;

    public TransactionsController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("/transactions")
    public ResponseEntity<Long> handleTransaction(@RequestBody TransactionDTO transactionDTO) {
        try {
            long transactionId = transactionService.processTransaction(transactionDTO);
            return new ResponseEntity<>(transactionId, HttpStatus.CREATED);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Couldn't add the transaction to database", e);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Transaction>> getAllTransactions( ) {
        try {
            List<Transaction> transactions = transactionService.getAllTransactions();
            return new ResponseEntity<>(transactions, HttpStatus.OK);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Couldn't retrieve transactions", e);
        }
    }


    @GetMapping("/transactions")
    public ResponseEntity<Page<Transaction>> getTransactions(
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int pageSize,
            @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection,
            @RequestParam(defaultValue = "transactionDate") String sortBy,
            @RequestParam(defaultValue = "") String filterBy) {

        TransactionPage transactionPage = new TransactionPage(pageNumber, pageSize, sortDirection, sortBy, filterBy);
        return new ResponseEntity<>(transactionService.getTransactions(transactionPage), HttpStatus.OK);
    }


}
