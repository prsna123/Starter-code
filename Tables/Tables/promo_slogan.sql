CREATE TABLE dev_test.promo_slogan (
	id UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_promo_slogan_id DEFAULT NEWSEQUENTIALID(),
	tpo_slogan_id UNIQUEIDENTIFIER NOT NULL,
	customer_id BIGINT NULL,
	intermediary_customer_id BIGINT NULL,
	geo_id INT NULL,
	name NVARCHAR(255) NOT NULL,
	type NVARCHAR(255) NOT NULL,
	CONSTRAINT PK_promo_slogan PRIMARY KEY CLUSTERED (id),

	CONSTRAINT UQ_promo_slogan_tpo_slogan_id UNIQUE (tpo_slogan_id),
	CONSTRAINT FK_promo_slogan_customer_id FOREIGN KEY (customer_id) REFERENCES dev_test.dim_customer (customer_id),
	CONSTRAINT FK_promo_slogan_intermediary_customer_id FOREIGN KEY (intermediary_customer_id) REFERENCES dev_test.dim_intermediary_customer (intermediary_customer_id),
	CONSTRAINT FK_promo_slogan_geo_id FOREIGN KEY (geo_id) REFERENCES dev_test.dim_geo (geo_id),
);
