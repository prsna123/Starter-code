CREATE TABLE dev_test.promo_slogan_products (
	id UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_promo_slogan_products_mapping_id DEFAULT NEWSEQUENTIALID(),
	tpo_slogan_id UNIQUEIDENTIFIER NOT NULL,
	product_id BIGINT NOT NULL,
	promo_calendar_scenario_id UNIQUEIDENTIFIER NOT NULL,
	CONSTRAINT PK_promo_slogan_products_mapping PRIMARY KEY CLUSTERED (id),
	CONSTRAINT UQ_promo_slogan_products_mapping UNIQUE (tpo_slogan_id, product_id, promo_calendar_scenario_id),
	CONSTRAINT FK_promo_slogan_products_mapping_tpo_slogan_id FOREIGN KEY (tpo_slogan_id) REFERENCES dev_test.promo_slogan (tpo_slogan_id),
	CONSTRAINT FK_promo_slogan_products_mapping_product_id FOREIGN KEY (product_id) REFERENCES dev_test.dim_product (product_id),
	CONSTRAINT FK_promo_slogan_products_mapping_scenario_id FOREIGN KEY (promo_calendar_scenario_id) REFERENCES dev_test.scenario (scenario_id)
);