package pe.com.cd.repository;

import pe.com.cd.domain.CuentaBancaria;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the CuentaBancaria entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CuentaBancariaRepository extends JpaRepository<CuentaBancaria, Long> {

}
