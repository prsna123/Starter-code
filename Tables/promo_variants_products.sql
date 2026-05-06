CREATE TABLE dev_test.promo_variants_products (
	id UNIQUEIDENTIFIER NOT NULL CONSTRAINT DF_promo_variants_product_mapping_id DEFAULT NEWSEQUENTIALID(),
	tpo_tactic_id UNIQUEIDENTIFIER NOT NULL,
	product_id BIGINT NOT NULL,
	promo_calendar_scenario_id UNIQUEIDENTIFIER NOT NULL,
	event_id UNIQUEIDENTIFIER NOT NULL,

	CONSTRAINT PK_promo_variants_product_mapping PRIMARY KEY CLUSTERED (id),
	CONSTRAINT UQ_promo_variants_product_mapping UNIQUE (tpo_tactic_id, product_id, promo_calendar_scenario_id),
	CONSTRAINT FK_promo_variants_product_mapping_tpo_tactic_id FOREIGN KEY (tpo_tactic_id) REFERENCES dev_test.promo_variants (tpo_tactic_id),
	CONSTRAINT FK_promo_variants_product_mapping_product_id FOREIGN KEY (product_id) REFERENCES dev_test.dim_product (product_id),
	CONSTRAINT FK_promo_variants_product_mapping_scenario_id FOREIGN KEY (promo_calendar_scenario_id) REFERENCES dev_test.scenario (scenario_id),
	CONSTRAINT FK_promo_variants_product_mapping_event_id FOREIGN KEY (event_id) REFERENCES dev_test.promo_calendar (event_id)
);