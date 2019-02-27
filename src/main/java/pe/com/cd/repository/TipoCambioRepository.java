package pe.com.cd.repository;

import pe.com.cd.domain.TipoCambio;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the TipoCambio entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TipoCambioRepository extends JpaRepository<TipoCambio, Long> {

}
