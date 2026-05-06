
CREATE TABLE dev_test.retailer_year (
    -- ==========================================
    -- 1. Identifiers & Foreign Keys
    -- ==========================================
    ui_run_id NVARCHAR(30) NOT NULL,
    customer_id BIGINT NOT NULL,
    product_id BIGINT NOT NULL,
    geo_id INT NOT NULL,
    cal_id INT NOT NULL,
    intermediary_customer_id BIGINT NULL,

    -- ==========================================
    -- 2. Dimension Attributes
    -- ==========================================
    customer_name NVARCHAR(255) NULL,
    technology NVARCHAR(255) NULL,
    segment NVARCHAR(255) NULL,
    brand NVARCHAR(255) NULL,
    brand_tech NVARCHAR(255) NULL,
    ppg NVARCHAR(255) NULL,
    ppg_case NVARCHAR(255) NULL,

    -- ==========================================
    -- 3. Time Dimensions
    -- ==========================================
    mars_year INT NOT NULL,
    mars_period INT NOT NULL,
    mars_week INT NOT NULL,

    -- ==========================================
    -- 4. Pricing & Flags (Using Decimal for exact math)
    -- ==========================================
    standard_shelf_price DECIMAL(18, 4) NULL,
    average_price DECIMAL(18, 4) NULL,
    promo_flag BIT NULL,
    number_of_weeks_on_promotion INT NULL,

    -- ==========================================
    -- 5. Total Metrics
    -- ==========================================
    total_volume DECIMAL(18, 4) NULL,
    total_volume_ya DECIMAL(18, 4) NULL,
    total_units DECIMAL(18, 4) NULL,
    total_gross_sales_value DECIMAL(18, 4) NULL,
    total_gross_sales_value_ya DECIMAL(18, 4) NULL,
    total_trade_investment DECIMAL(18, 4) NULL,
    total_standard_trade_terms DECIMAL(18, 4) NULL,
    total_discretionary_trade_terms DECIMAL(18, 4) NULL,
    total_net_sales_value DECIMAL(18, 4) NULL,
    total_net_sales_value_ya DECIMAL(18, 4) NULL,
    total_cogs DECIMAL(18, 4) NULL,
    total_gross_profit DECIMAL(18, 4) NULL,
    total_gross_profit_ya DECIMAL(18, 4) NULL,
    total_retail_sales_value DECIMAL(18, 4) NULL,
    total_retail_sales_value_ya DECIMAL(18, 4) NULL,
    total_value_chain_investment DECIMAL(18, 4) NULL,
    total_cost_of_sales DECIMAL(18, 4) NULL,
    total_profit_pool DECIMAL(18, 4) NULL,
    total_trade_margin DECIMAL(18, 4) NULL,

    -- ==========================================
    -- 6. Baseline Metrics
    -- ==========================================
    baseline_volume DECIMAL(18, 4) NULL,
    baseline_units DECIMAL(18, 4) NULL,
    baseline_gross_sales_value DECIMAL(18, 4) NULL,
    baseline_trade_investment DECIMAL(18, 4) NULL,
    baseline_standard_trade_terms DECIMAL(18, 4) NULL,
    baseline_discretionary_trade_terms DECIMAL(18, 4) NULL,
    baseline_net_sales_value DECIMAL(18, 4) NULL,
    baseline_cogs DECIMAL(18, 4) NULL,
    baseline_gross_profit DECIMAL(18, 4) NULL,
    baseline_retail_sales_value DECIMAL(18, 4) NULL,
    baseline_value_chain_investment DECIMAL(18, 4) NULL,
    baseline_cost_of_sales DECIMAL(18, 4) NULL,
    baseline_profit_pool DECIMAL(18, 4) NULL,
    baseline_trade_margin DECIMAL(18, 4) NULL,

    -- ==========================================
    -- 7. Incremental Metrics
    -- ==========================================
    incremental_volume DECIMAL(18, 4) NULL,
    incremental_units DECIMAL(18, 4) NULL,
    incremental_gross_sales_value DECIMAL(18, 4) NULL,
    incremental_gross_sales_value_ya DECIMAL(18, 4) NULL, -- Typo fixed here
    incremental_trade_investment DECIMAL(18, 4) NULL,
    incremental_standard_trade_terms DECIMAL(18, 4) NULL,
    incremental_discretionary_trade_terms DECIMAL(18, 4) NULL,
    incremental_net_sales_value DECIMAL(18, 4) NULL,
    incremental_net_sales_value_ya DECIMAL(18, 4) NULL,
    incremental_cogs DECIMAL(18, 4) NULL,
    incremental_gross_profit DECIMAL(18, 4) NULL,
    incremental_gross_profit_ya DECIMAL(18, 4) NULL,
    incremental_retail_sales_value DECIMAL(18, 4) NULL,
    incremental_retail_sales_value_ya DECIMAL(18, 4) NULL,
    incremental_value_chain_investment DECIMAL(18, 4) NULL,
    incremental_cost_of_sales DECIMAL(18, 4) NULL,
    incremental_profit_pool DECIMAL(18, 4) NULL,
    incremental_trade_margin DECIMAL(18, 4) NULL,

    -- ==========================================
    -- 8. Rates, ROI & Uplifts (Higher precision)
    -- ==========================================
    promo_spend DECIMAL(18, 4) NULL,
    promo_spend_ya DECIMAL(18, 4) NULL,
    promo_volume DECIMAL(18, 4) NULL,
    trade_rate DECIMAL(18, 6) NULL,
    trade_rate_ya DECIMAL(18, 6) NULL,
    spend_rate DECIMAL(18, 6) NULL,
    spend_rate_ya DECIMAL(18, 6) NULL,
    unit_uplift DECIMAL(18, 6) NULL,
    unit_uplift_ya DECIMAL(18, 6) NULL,
    volume_uplift DECIMAL(18, 6) NULL,
    volume_uplift_ya DECIMAL(18, 6) NULL,
    retail_sales_value_lift DECIMAL(18, 6) NULL,
    retail_sales_value_lift_ya DECIMAL(18, 6) NULL,
    retailer_margin_percentage DECIMAL(18, 6) NULL,
    retailer_margin_percentage_ya DECIMAL(18, 6) NULL,
    nsv_roi DECIMAL(18, 6) NULL,
    nsv_roi_ya DECIMAL(18, 6) NULL,
    gross_profit_roi DECIMAL(18, 6) NULL,
    gross_profit_roi_ya DECIMAL(18, 6) NULL,

    -- ==========================================
    -- CONSTRAINTS
    -- ==========================================
    -- Composite Primary Key to ensure row uniqueness per run, product, customer, and time
    CONSTRAINT PK_retailer_ppgcase_weekly PRIMARY KEY CLUSTERED (
        ui_run_id, customer_id, product_id, geo_id, cal_id, mars_week
    ),

    -- Foreign Keys tying back to the core dimension tables
    CONSTRAINT FK_ppgcase_weekly_run FOREIGN KEY (ui_run_id) REFERENCES dev_test.[run] (ui_run_id),
    CONSTRAINT FK_ppgcase_weekly_customer FOREIGN KEY (customer_id) REFERENCES dev_test.dim_customer (customer_id),
    CONSTRAINT FK_ppgcase_weekly_geo FOREIGN KEY (geo_id) REFERENCES dev_test.dim_geo (geo_id),
    CONSTRAINT FK_ppgcase_weekly_product FOREIGN KEY (product_id) REFERENCES dev_test.dim_product (product_id)
);