CREATE TABLE dev_test.[run] (
    -- Primary Key (Ensure input.scenario.scenario_id matches this type)
    ui_run_id VARCHAR(30) NOT NULL,
    databricks_run_id NVARCHAR(255) NULL,
    analytics_run_type NVARCHAR(255) NULL,
    
    -- Dimensional Scoping
    geo_id INT NULL,
    customer_id BIGINT NULL,
    ui_run_name NVARCHAR(255) NOT NULL,
    promotion_year INT NULL,
    
    -- Execution Tracking States
    [status] NVARCHAR(20) NOT NULL,
    status_code INT NULL,
    error_message NVARCHAR(2000) NULL,
    target_achieved NVARCHAR(50) NULL, 

    -- Scenario Context Mapping (Foreign Keys)
    promo_calendar_scenario_id VARCHAR(36) NULL,
    promo_calendar_scenario_id_optimized VARCHAR(36) NULL,
    promo_funding_scenario_id VARCHAR(36) NULL,
    promo_funding_scenario_id_optimized VARCHAR(36) NULL,
    ssp_calendar_scenario_id VARCHAR(36) NULL,
    list_price_scenario_id VARCHAR(36) NULL,
    cogs_scenario_id VARCHAR(36) NULL,
    taxes_scenario_id VARCHAR(36) NULL,
    promo_guardrails_scenario_id VARCHAR(36) NULL,
    promo_outcome_constraints_scenario_id VARCHAR(36) NULL,
    locked_promotion_scenario_id VARCHAR(36) NULL,
    reference_run_id VARCHAR(36) NOT NULL,

    -- Corporate Erp Sync Status (Anaplan Integration)
    send_to_anaplan BIT NOT NULL CONSTRAINT DF_run_send_to_anaplan DEFAULT (0),
    send_to_anaplan_status NVARCHAR(255) NULL,
    anaplan_last_sync_date DATETIME NULL,

    -- Systems Auditing Metrics
    created_by NVARCHAR(128) NOT NULL,
    created_time DATETIME2(7) NOT NULL CONSTRAINT DF_run_created_time DEFAULT SYSUTCDATETIME(), 
    last_updated_by NVARCHAR(128) NULL,
    last_updated_time DATETIME2(7) NULL, 
    shared_to NVARCHAR(255) NULL,

    -- Structured Integrity Assertions
    CONSTRAINT PK_run PRIMARY KEY CLUSTERED (ui_run_id),
    CONSTRAINT FK_run_geo_id FOREIGN KEY (geo_id) REFERENCES dev_test.dim_geo (geo_id),
    CONSTRAINT FK_run_customer_id FOREIGN KEY (customer_id) REFERENCES dev_test.dim_customer (customer_id),
    
    -- Core System Schema Dependencies
    CONSTRAINT FK_run_promo_calendar_scenario_id FOREIGN KEY (promo_calendar_scenario_id) REFERENCES dev_test.scenario (scenario_id),
    CONSTRAINT FK_run_promo_calendar_scenario_id_optimized FOREIGN KEY (promo_calendar_scenario_id_optimized) REFERENCES dev_test.scenario (scenario_id),
    CONSTRAINT FK_run_promo_funding_scenario_id FOREIGN KEY (promo_funding_scenario_id) REFERENCES dev_test.scenario (scenario_id),
    CONSTRAINT FK_run_promo_funding_scenario_id_optimized FOREIGN KEY (promo_funding_scenario_id_optimized) REFERENCES dev_test.scenario (scenario_id),
    CONSTRAINT FK_run_ssp_calendar_scenario_id FOREIGN KEY (ssp_calendar_scenario_id) REFERENCES dev_test.scenario (scenario_id),
    CONSTRAINT FK_run_list_price_scenario_id FOREIGN KEY (list_price_scenario_id) REFERENCES dev_test.scenario (scenario_id),
    CONSTRAINT FK_run_cogs_scenario_id FOREIGN KEY (cogs_scenario_id) REFERENCES dev_test.scenario (scenario_id),
    CONSTRAINT FK_run_taxes_scenario_id FOREIGN KEY (taxes_scenario_id) REFERENCES dev_test.scenario (scenario_id),
    CONSTRAINT FK_run_promo_guardrails_scenario_id FOREIGN KEY (promo_guardrails_scenario_id) REFERENCES dev_test.scenario (scenario_id),
    CONSTRAINT FK_run_promo_outcome_constraints_scenario_id FOREIGN KEY (promo_outcome_constraints_scenario_id) REFERENCES dev_test.scenario (scenario_id),
    CONSTRAINT FK_run_locked_promotion_scenario_id FOREIGN KEY (locked_promotion_scenario_id) REFERENCES dev_test.scenario (scenario_id),
);