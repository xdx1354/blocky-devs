package org.example.DTO;

import lombok.Data;
import java.time.LocalDate;
import java.time.Instant;

@Data
public class TransactionDTO {

    private String sender;
    private String ethAmount;
    private String tokenAmount;
    private String exchangeRate;
    private String transactionDate;

}