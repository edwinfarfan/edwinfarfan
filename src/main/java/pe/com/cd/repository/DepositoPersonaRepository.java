package pe.com.cd.repository;

import pe.com.cd.domain.DepositoPersona;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the DepositoPersona entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DepositoPersonaRepository extends JpaRepository<DepositoPersona, Long> {

}
