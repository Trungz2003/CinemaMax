package org.example.cinemamax_server.service;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jwt.JWTClaimsSet;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.example.cinemamax_server.constant.PredefinedRole;
import org.example.cinemamax_server.dto.request.UserRequest;
import org.example.cinemamax_server.dto.response.UserResponse;
import org.example.cinemamax_server.entity.Role;
import org.example.cinemamax_server.entity.User;
import org.example.cinemamax_server.exception.AppException;
import org.example.cinemamax_server.exception.ErrorCode;
import org.example.cinemamax_server.mapper.UserMapper;
import org.example.cinemamax_server.repository.RoleRepository;
import org.example.cinemamax_server.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.io.FileInputStream;
import java.io.IOException;


@Service
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FirebaseAuthService {

    private final UserRepository repository;
    private final RoleRepository roleRepository;
    private final UserMapper userMapper;

    public FirebaseAuthService(UserRepository repository, RoleRepository roleRepository, UserMapper userMapper) throws IOException {
        this.repository = repository;
        this.roleRepository = roleRepository;
        this.userMapper = userMapper;

        if (FirebaseApp.getApps().isEmpty()) {  // Kiểm tra xem đã khởi tạo chưa
            FileInputStream serviceAccount = new FileInputStream("src/main/java/org/example/cinemamax_server/configuration/streamphim-a02d9-firebase-adminsdk-fbsvc-fa9ab58d8e.json");

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            FirebaseApp.initializeApp(options);
        }
    }


    // Xác thực token Firebase
    public FirebaseToken verifyToken(String idToken) throws Exception {
        FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
        return decodedToken;
    }


}


