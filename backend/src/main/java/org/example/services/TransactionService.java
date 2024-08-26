package org.example.services;

import org.example.DTO.TransactionDTO;
import org.example.model.Transaction;
import org.example.repositories.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

@Service
public class TransactionService {

    private final TransactionRepository transactionRepository;

    @Autowired
    public TransactionService(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    public long processTransaction(TransactionDTO dto) {

        // Parsing data
        String sender = dto.getSender();
        Long ethAmount = Long.parseLong(dto.getEthAmount());
        Long tokenAmount = Long.parseLong(dto.getTokenAmount());
        Long exchangeRate = Long.parseLong(dto.getExchangeRate());
        Instant instant = Instant.ofEpochSecond(Long.parseLong(dto.getTransactionDate()));
        LocalDate transactionDate = instant.atZone(ZoneId.systemDefault()).toLocalDate();

        // Creating valid entity
        Transaction transaction = new Transaction();
        transaction.setTransactionDate(transactionDate);
        transaction.setExchangeRate(exchangeRate);
        transaction.setTransactionSender(sender);
        transaction.setErc20Amount(tokenAmount);
        transaction.setEthAmount(ethAmount);

        // Saving entity to DB
        transactionRepository.save(transaction);
        return transaction.getId();

    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
