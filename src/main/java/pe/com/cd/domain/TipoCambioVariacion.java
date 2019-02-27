package pe.com.cd.domain;


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

/**
 * A TipoCambioVariacion.
 */
@Entity
@Table(name = "tipo_cambio_variacion")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "tipocambiovariacion")
public class TipoCambioVariacion implements Serializable {

    private static final long serialVersionUID = 1L;
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "variacion_monto", precision = 10, scale = 2)
    private BigDecimal variacionMonto;

    @Column(name = "variacion_porcentaje", precision = 10, scale = 2)
    private BigDecimal variacionPorcentaje;

    @Column(name = "estado")
    private String estado;

    @OneToOne
    @JoinColumn(unique = true)
    private TipoCambio tipoCambio;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BigDecimal getVariacionMonto() {
        return variacionMonto;
    }

    public TipoCambioVariacion variacionMonto(BigDecimal variacionMonto) {
        this.variacionMonto = variacionMonto;
        return this;
    }

    public void setVariacionMonto(BigDecimal variacionMonto) {
        this.variacionMonto = variacionMonto;
    }

    public BigDecimal getVariacionPorcentaje() {
        return variacionPorcentaje;
    }

    public TipoCambioVariacion variacionPorcentaje(BigDecimal variacionPorcentaje) {
        this.variacionPorcentaje = variacionPorcentaje;
        return this;
    }

    public void setVariacionPorcentaje(BigDecimal variacionPorcentaje) {
        this.variacionPorcentaje = variacionPorcentaje;
    }

    public String getEstado() {
        return estado;
    }

    public TipoCambioVariacion estado(String estado) {
        this.estado = estado;
        return this;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public TipoCambio getTipoCambio() {
        return tipoCambio;
    }

    public TipoCambioVariacion tipoCambio(TipoCambio tipoCambio) {
        this.tipoCambio = tipoCambio;
        return this;
    }

    public void setTipoCambio(TipoCambio tipoCambio) {
        this.tipoCambio = tipoCambio;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TipoCambioVariacion tipoCambioVariacion = (TipoCambioVariacion) o;
        if (tipoCambioVariacion.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), tipoCambioVariacion.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TipoCambioVariacion{" +
            "id=" + getId() +
            ", variacionMonto=" + getVariacionMonto() +
            ", variacionPorcentaje=" + getVariacionPorcentaje() +
            ", estado='" + getEstado() + "'" +
            "}";
    }
}
