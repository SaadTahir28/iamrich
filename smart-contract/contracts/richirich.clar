
(define-constant contract-owner tx-sender)

(define-constant ERR_CONTRACT_OWNER_ONLY (err u1000))
(define-constant ERR_AMOUNT_NOT_ENOUGH (err u1001))
(define-constant ERR_COMMISION_RATE_CANNOT_BE_ZERO (err u1002))
(define-constant ERR_NEXT_TRANSACTION_RATE_CANNOT_BE_ZERO (err u1003))

(define-data-var commission-rate uint u25) ;; this is 2.5% (25/1000)
(define-data-var next-transaction-rate uint u100) ;; this is 10% (100/1000) of the last transaction
(define-data-var current-richest principal tx-sender)
(define-data-var last-transaction-amount uint u10000000) ;; this is the initial transaction rate
(define-map rich-history { user: principal } { amount: uint })

;; We need to have incremental investment so that the next person who wants to become should pay more than the current richest amount
;; We need to have history of rich people

;; getters
(define-read-only (get-current-richest)
    (var-get current-richest)
)

(define-read-only (get-last-transaction-amount)
    (var-get last-transaction-amount)
)

(define-read-only (get-commission-rate)
    (var-get commission-rate)
)

(define-read-only (get-next-transaction-rate)
    (var-get next-transaction-rate)
)

(define-read-only (get-next-transaction-amount)
    (+ (get-last-transaction-amount) (/ (* (get-last-transaction-amount) (get-next-transaction-rate)) u1000))
)

(define-read-only (get-amount-commission (amount uint))
    (/ (* amount (get-commission-rate)) u1000)
)

;; setters
(define-public (set-commission-rate (rate uint))
    (begin
        (asserts! (is-eq tx-sender contract-owner) ERR_CONTRACT_OWNER_ONLY)
        (asserts! (> rate u0) ERR_COMMISION_RATE_CANNOT_BE_ZERO)
        (ok (var-set commission-rate rate))
    )
)

(define-public (set-next-transaction-rate (rate uint))
    (begin
        (asserts! (is-eq tx-sender contract-owner) ERR_CONTRACT_OWNER_ONLY)
        (asserts! (> rate u0) ERR_NEXT_TRANSACTION_RATE_CANNOT_BE_ZERO)
        (ok (var-set next-transaction-rate rate))
    )
)

;; main
(define-public (become-richest)
    (let
        (
            (amount (get-next-transaction-amount))
            (commission (get-amount-commission amount))
        )
        (asserts! (> amount (get-last-transaction-amount)) ERR_AMOUNT_NOT_ENOUGH)
        (try! (stx-transfer? commission tx-sender (as-contract tx-sender)))
        (var-set current-richest tx-sender)
        (var-set last-transaction-amount amount)
        (ok tx-sender)
    )
)