package digital.cesko.city_request

import digital.cesko.AbstractSpringTest
import digital.cesko.city_request.CityRequest
import org.assertj.core.api.Assertions.assertThat
import kotlin.test.Test

class CityRequestTest : AbstractSpringTest() {

    @Test
    fun `Should add to sheet`() {
        post("/api/v2/service/cityrequest",
                payload = CityRequest(
                        city = "Humpolec",
                        email = "starosta@humpolec.cz",
                        name = "Pan Starosta",
                        subscribe = true,
                        gdpr = true
                )
        ).andExpect {
            status { isOk }
            content { string("ok") }
        }
    }
}
