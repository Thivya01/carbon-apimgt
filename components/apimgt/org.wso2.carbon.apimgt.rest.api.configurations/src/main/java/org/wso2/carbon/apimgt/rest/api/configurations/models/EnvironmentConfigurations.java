/*
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.wso2.carbon.apimgt.rest.api.configurations.models;

import org.wso2.carbon.config.annotation.Configuration;

/**
 * Class to hold environment configurations
 */
@Configuration(description = "environment and key management configurations")
public class EnvironmentConfigurations {

    private String host = "";

    private String loginTokenPath = "/login/token";

    private String label = "Default";

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getLoginTokenPath() {
        return loginTokenPath;
    }

    public void setLoginTokenPath(String loginTokenPath) {
        this.loginTokenPath = loginTokenPath;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }
}