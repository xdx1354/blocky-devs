package org.example.repositories.specification;
import org.springframework.data.jpa.domain.Specification;
import org.example.model.Transaction;


public class TransactionSpecification {

    public static Specification<Transaction> filterBySender(String transactionSender) {
        return (root, query, criteriaBuilder) -> {
            if (transactionSender == null || transactionSender.isEmpty()) {
                return criteriaBuilder.conjunction(); // no filtering
            }
            return criteriaBuilder.equal(root.get("transactionSender"), transactionSender);
        };
    }



}
