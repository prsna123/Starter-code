CREATE TABLE dev_test.scenario (
	id varchar(36) NOT NULL,
	scenario_id varchar(36) NOT NULL,
	geo_id INT NULL,
	scenario_name NVARCHAR(255) NOT NULL,
	scenario_type NVARCHAR(50) NOT NULL,
	scenario_status NVARCHAR(20) NOT NULL,
	table_name NVARCHAR(100) NOT NULL,
	last_refresh_date DATETIME2(7) NULL,
	created_time DATETIME2(7) NOT NULL CONSTRAINT DF_scenario_created_time DEFAULT SYSUTCDATETIME(),
	last_updated_time DATETIME2(7) NULL,
	CONSTRAINT PK_scenario PRIMARY KEY CLUSTERED (scenario_id),
	CONSTRAINT FK_scenario_geo_id FOREIGN KEY (geo_id) REFERENCES dev_test.dim_geo (geo_id),
	CONSTRAINT CK_scenario_type_enum CHECK (scenario_type IN ('HISTORICAL', 'USER_INPUT', 'BEST_ASSUMPTION')),
	CONSTRAINT CK_scenario_status_enum CHECK (scenario_status IN ('APPROVED', 'REFUSED', 'PENDING')),
	CONSTRAINT CK_scenario_table_name_enum CHECK (table_name IN (
		'PROMO_CALENDAR',
		'PROMO_FUNDING',
		'PROMO_GUARDRAILS',
		'PROMO_OUTCOME_CONSTRAINTS',
		'LOCKED_PROMOTIONS',
		'SSP_CALENDAR',
		'LIST_PRICE',
		'TAXES',
		'COGS'
	))
);