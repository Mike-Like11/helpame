package com.example.helpame.repository;

import com.example.helpame.entity.ShortUserInfo;
import com.example.helpame.entity.User;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, ObjectId> {
    Optional<User> findByEmail(String email);
    User findByShortUserInfo(ShortUserInfo shortUserInfo);
}
