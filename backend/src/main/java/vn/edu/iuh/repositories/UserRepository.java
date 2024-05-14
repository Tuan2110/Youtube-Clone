package vn.edu.iuh.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import vn.edu.iuh.models.User;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findBySub(String sub);
}
