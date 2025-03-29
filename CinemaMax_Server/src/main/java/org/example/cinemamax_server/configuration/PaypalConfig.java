package org.example.cinemamax_server.configuration;

import com.paypal.base.rest.APIContext;
import lombok.AccessLevel;
import org.springframework.beans.factory.annotation.Value;
import lombok.experimental.FieldDefaults;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaypalConfig {
    @Value("${paypal.client_id}")
    String cliendID;

    @Value("${paypal.secret}")
    String clientSecret;

    @Value("${paypal.mode}")
    String mode;

    @Bean
    public APIContext apiContext() {
        return new APIContext(cliendID, clientSecret, mode);
    }
}
