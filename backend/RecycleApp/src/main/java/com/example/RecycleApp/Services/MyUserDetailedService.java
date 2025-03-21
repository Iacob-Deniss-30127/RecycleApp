package com.example.RecycleApp.Services;

import com.example.RecycleApp.Entities.UserEntity;
import com.example.RecycleApp.Model.UserPrincipal;
import com.example.RecycleApp.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class MyUserDetailedService implements UserDetailsService {

   @Autowired
   private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity userEntity = userRepository.findByEmail(email);

        if(userEntity == null) {
            System.out.println("User not found" +userEntity.getEmail());
            throw new UsernameNotFoundException("User not found");
        }
        System.out.println("User found: " + userEntity.getEmail());
        return new UserPrincipal(userEntity);
    }
}
