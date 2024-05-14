package vn.edu.iuh.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import vn.edu.iuh.models.Video;

import java.util.List;

public interface VideoRepository extends MongoRepository<Video, String> {
    @Query("{'title': {$regex: ?0, $options: 'i'}}")
    List<Video> search(String title);
}
