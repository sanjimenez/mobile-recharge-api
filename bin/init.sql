
CREATE TABLE public.transaction (
                                    id uuid PRIMARY KEY NOT NULL,
                                    user_id varchar NOT NULL,
                                    phone_number varchar(20) NOT NULL,
                                    amount numeric(10, 2) NOT NULL,
                                    status varchar(20) NOT NULL,
                                    created_at timestamp DEFAULT now() NOT NULL,
                                    updated_at timestamp DEFAULT now() NOT NULL,
                                    response_provider varchar NULL
);

-- Comments on table and columns
COMMENT ON TABLE public.transaction IS 'Table that stores users’ financial transactions.';

COMMENT ON COLUMN public.transaction.id IS 'Unique identifier (UUID) for the transaction.';
COMMENT ON COLUMN public.transaction.user_id IS 'Identifier of the user associated with the transaction.';
COMMENT ON COLUMN public.transaction.phone_number IS 'Phone number linked to the transaction.';
COMMENT ON COLUMN public.transaction.amount IS 'Total transaction amount.';
COMMENT ON COLUMN public.transaction.status IS 'Current transaction status (PENDING, SUCCESS, DECLINED, FAILED).';
COMMENT ON COLUMN public.transaction.created_at IS 'Timestamp when the record was created.';
COMMENT ON COLUMN public.transaction.updated_at IS 'Timestamp when the record was last updated.';
COMMENT ON COLUMN public.transaction.response_provider IS 'Response or additional details returned by the payment provider.';