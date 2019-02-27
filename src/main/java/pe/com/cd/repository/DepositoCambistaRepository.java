package pe.com.cd.repository;

import pe.com.cd.domain.DepositoCambista;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DepositoCambista entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepositoCambistaRepository extends JpaRepository<DepositoCambista, Long> {

}
