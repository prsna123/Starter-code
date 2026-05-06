CREATE TABLE input.promo_variants (
	id UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_promo_variants_id DEFAULT NEWSEQUENTIALID(),
	tpo_tactic_id UNIQUEIDENTIFIER NOT NULL,
	customer_id BIGINT NULL,
	geo_id INT NULL,
	tactic_type NVARCHAR(50) NOT NULL,
	sub_tactic NVARCHAR(100) NULL,
	offer_type NVARCHAR(50) NULL,
	offer_mechanic NVARCHAR(100) NULL,
	feature NVARCHAR(255) NULL,
	display NVARCHAR(255) NULL,
	spend_buy DECIMAL(18, 4) NULL,
	reward_type NVARCHAR(50) NULL,
	save_get_for NVARCHAR(255) NULL,

	CONSTRAINT PK_promo_variants PRIMARY KEY CLUSTERED (id),
	CONSTRAINT UQ_promo_variants_tpo_tactic_id UNIQUE (tpo_tactic_id),
	CONSTRAINT FK_promo_variants_customer_id FOREIGN KEY (customer_id) REFERENCES input.dim_customer (customer_id),
	CONSTRAINT FK_promo_variants_geo_id FOREIGN KEY (geo_id) REFERENCES input.dim_geo (geo_id)
);