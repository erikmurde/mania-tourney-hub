package com.tourneyhub.backend.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.oauth2.client.registration.*;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
@PropertySource("classpath:application.properties")
public class SecurityConfig {

    @Autowired
    private OAuth2UserService oAuth2UserService;

    @Value("${frontend.homepage.url}")
    private String frontendHomepageUrl;

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        return new InMemoryClientRegistrationRepository(this.osuClientRegistration());
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of(frontendHomepageUrl));
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");
        config.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(CsrfConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .exceptionHandling(customizer ->
                        customizer.authenticationEntryPoint(
                                new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED)
                        )
                )
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/api/countries/**",
                                "/api/roles/**",
                                "/api/statuses/**",
                                "/api/mapTypes/**",
                                "/api/stages/tournament/**",
                                "/api/maps/stage/{stageId}/inMappool",
                                "/api/users/{tournamentId}/**",
                                "/api/tournaments/**",
                                "/api/teams/**"
                        ).permitAll()
                        .requestMatchers(
                                HttpMethod.GET,
                                "/api/lobbies/**",
                                "/api/matches/**",
                                "/api/tournamentParticipants/**",
                                "/api/statistics/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl(frontendHomepageUrl)
                        .failureUrl(frontendHomepageUrl)
                        .userInfoEndpoint(endpoint -> endpoint
                                .userService(oAuth2UserService)
                        )
                )
                .oauth2Client(Customizer.withDefaults())
                .logout(logout -> logout.logoutSuccessUrl(frontendHomepageUrl))
                .build();
    }

    private ClientRegistration osuClientRegistration() {
        return ClientRegistration
                .withRegistrationId("osu")
                .clientId("29436")
                .clientSecret("nVPI68rYhCUAVFSf0Y0yOPRyPw1r2PgV8ulAkPfU")
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .redirectUri("http://localhost:8080/login/oauth2/code/osu")
                .authorizationUri("https://osu.ppy.sh/oauth/authorize")
                .tokenUri("https://osu.ppy.sh/oauth/token")
                .userInfoUri("https://osu.ppy.sh/api/v2/me/mania")
                .userNameAttributeName("username")
                .scope("public")
                .build();
    }
}
