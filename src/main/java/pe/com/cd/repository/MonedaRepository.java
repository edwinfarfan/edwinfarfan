package pe.com.cd.repository;

import pe.com.cd.domain.Moneda;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Moneda entity.
 */
@SuppressWarnings("unused")
@Repository
public interface MonedaRepository extends JpaRepository<Moneda, Long> {

}
