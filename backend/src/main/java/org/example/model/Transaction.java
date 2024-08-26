package org.example.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "transaction_date", nullable = false)
    private LocalDate transactionDate;

    @Column(name = "exchange_rate", nullable = false)
    private Long exchangeRate;

    @Column(name = "transaction_sender", nullable = false)
    private String transactionSender;

    @Column(name = "erc20_amount", nullable = false)
    private Long erc20Amount;

    @Column(name = "eth_amount", nullable = false)
    private Long ethAmount;
}
