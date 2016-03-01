package com.bobbysnehacorp.mymedia.repository;

import com.bobbysnehacorp.mymedia.domain.Authority;

import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Spring Data JPA repository for the Authority entity.
 */
public interface AuthorityRepository extends JpaRepository<Authority, String> {
}
