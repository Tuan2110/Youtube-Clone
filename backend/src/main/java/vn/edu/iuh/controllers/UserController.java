package vn.edu.iuh.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.dtos.UserDTO;
import vn.edu.iuh.models.User;
import vn.edu.iuh.services.UserRegistrationService;
import vn.edu.iuh.services.UserService;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserRegistrationService userRegistrationService;
    private final UserService userService;

    @GetMapping("/register")
    public ResponseEntity<String> register(Authentication authentication){
        Jwt jwt = (Jwt) authentication.getPrincipal();

        String userId  = userRegistrationService.registerUser(jwt.getTokenValue());
        return ResponseEntity.ok(userId);
    }
    @GetMapping("/{userId}")
    public ResponseEntity<User> getUserById(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getUserById(userId));
    }
    @PostMapping("/subscribe/{userId}")
    public ResponseEntity<Boolean> subscribe(@PathVariable String userId) {
        return ResponseEntity.ok(userService.subscribeUser(userId));
    }
    @PostMapping("/unsubscribe/{userId}")
    public ResponseEntity<Boolean> unsubscribe(@PathVariable String userId) {
        return ResponseEntity.ok(userService.unsubscribeUser(userId));
    }

    @GetMapping("/{userId}/history")
    public ResponseEntity<List<String>> getHistory(@PathVariable String userId) {
        return ResponseEntity.ok(userService.getHistory(userId));
    }
}
