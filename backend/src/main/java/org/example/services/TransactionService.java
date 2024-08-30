package org.example.services;

import org.example.DTO.TransactionDTO;
import org.example.model.Transaction;
import org.example.model.TransactionPage;
import org.example.repositories.TransactionRepository;
import org.example.repositories.specification.TransactionSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
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
        BigInteger ethAmount = new BigInteger(dto.getEthAmount());
        BigInteger tokenAmount = new BigInteger(dto.getTokenAmount());
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

    public Page<Transaction> getTransactions(TransactionPage transactionPage) {

        System.out.println("Sort Direction: " + transactionPage.getSortDirection());
        System.out.println("Sort By: " + transactionPage.getSortBy());
        System.out.println("Page: " + transactionPage.getPageNumber());
        System.out.println("Page size: " + transactionPage.getPageSize());

        Sort sort = Sort.by(transactionPage.getSortDirection(), transactionPage.getSortBy());
        Pageable pageable = PageRequest.of(transactionPage.getPageNumber(), transactionPage.getPageSize(), sort);


        Specification<Transaction> spec = TransactionSpecification.filterBySender(transactionPage.getFilterBy());


        return transactionRepository.findAll(spec, pageable);
    }

    public List<Transaction> getAllTransactions( ) {
        return transactionRepository.findAll();
    }
}
