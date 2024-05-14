package vn.edu.iuh.services;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import vn.edu.iuh.dtos.UserInfoDTO;
import vn.edu.iuh.models.User;
import vn.edu.iuh.repositories.UserRepository;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserRegistrationService {
    @Value("${auth0.userinfoEndpoint}")
    private String userinfoEndpoint;
    private final UserRepository userRepository;

    public String registerUser(String token){
        HttpRequest request = HttpRequest.newBuilder()
                .GET()
                .uri(URI.create(userinfoEndpoint))
                .setHeader("Authorization", "Bearer " + token)
                .build();

        HttpClient httpClient = HttpClient.newBuilder()
                .version(HttpClient.Version.HTTP_2)
                .build();

        try {
            HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());
            String body = response.body();

            ObjectMapper objectMapper = new ObjectMapper();
            objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
            UserInfoDTO userInfoDTO = objectMapper.readValue(body, UserInfoDTO.class);

            Optional<User> userBySub = userRepository.findBySub(userInfoDTO.getSub());
            if(userBySub.isPresent()){
                return userBySub.get().getId();
            }

            User user = new User();
            user.setFirstName(userInfoDTO.getGivenName());
            user.setLastName(userInfoDTO.getFamilyName());
            user.setFullName(userInfoDTO.getName());
            user.setEmail(userInfoDTO.getNickName());
            user.setSub(userInfoDTO.getSub());
            user.setPicture(userInfoDTO.getPicture());

            User savedUser = userRepository.save(user);
            return savedUser.getId();
        } catch (IOException | InterruptedException e) {
            throw new RuntimeException(e);
        }

    }
}
